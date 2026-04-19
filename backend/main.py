from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import json
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

IMG_SIZE = 160

with open("class_names.json") as f:
    class_names = json.load(f)
num_classes = len(class_names)

# ── Rebuild exact same model architecture ────────────────────────────
def build_model():
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
        include_top=False,
        weights=None        # no imagenet weights needed, we load ours
    )
    base_model.trainable = False

    inputs  = tf.keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x       = tf.keras.layers.RandomFlip("horizontal")(inputs)
    x       = tf.keras.layers.RandomRotation(0.1)(x)
    x       = base_model(x, training=False)
    x       = tf.keras.layers.GlobalAveragePooling2D()(x)
    x       = tf.keras.layers.Dense(128, activation='relu')(x)
    x       = tf.keras.layers.Dropout(0.3)(x)
    outputs = tf.keras.layers.Dense(num_classes, activation='softmax')(x)

    model = tf.keras.Model(inputs, outputs)
    return model

model = build_model()

# Build model by passing dummy input first
dummy = tf.zeros((1, IMG_SIZE, IMG_SIZE, 3))
model(dummy)

# Load saved weights
model.load_weights("citrus_weights.weights.h5")
print("✅ Model loaded successfully!")

# ── Disease info ──────────────────────────────────────────────────────
disease_info = {
    "Canker": {
        "description": "Bacterial disease causing raised lesions on leaves and fruit.",
        "treatment"  : "Apply copper-based bactericides. Remove infected plant parts.",
        "severity"   : "High"
    },
    "Greening": {
        "description": "Deadly bacterial disease spread by psyllid insects.",
        "treatment"  : "No cure. Remove infected trees to prevent spread.",
        "severity"   : "Critical"
    },
    "Gummosis": {
        "description": "Fungal infection causing gum oozing from bark.",
        "treatment"  : "Apply fungicide. Improve drainage around roots.",
        "severity"   : "Medium"
    },
    "Healthy": {
        "description": "Plant appears healthy. No disease detected.",
        "treatment"  : "Continue regular care and monitoring.",
        "severity"   : "None"
    },
    "Leaf-miner": {
        "description": "Insect larvae tunneling inside leaves.",
        "treatment"  : "Use insecticides or neem oil spray.",
        "severity"   : "Low"
    },
    "Lemon-butterfly": {
        "description": "Caterpillar damage on young leaves.",
        "treatment"  : "Hand-pick caterpillars or use organic pesticide.",
        "severity"   : "Low"
    }
}

# ── Predict endpoint ──────────────────────────────────────────────────
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img, dtype=np.float32)

    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    predictions     = model.predict(img_array)
    predicted_idx   = int(np.argmax(predictions))
    predicted_class = class_names[predicted_idx]
    confidence      = float(np.max(predictions)) * 100

    all_probs = {
        class_names[i]: round(float(predictions[0][i]) * 100, 2)
        for i in range(len(class_names))
    }

    return {
        "predicted_class"  : predicted_class,
        "confidence"       : round(confidence, 2),
        "all_probabilities": all_probs,
        "disease_info"     : disease_info[predicted_class]
    }

@app.get("/")
def root():
    return {"status": "Citrus Disease API is running ✅"}