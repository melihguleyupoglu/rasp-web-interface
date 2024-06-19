from ultralytics import YOLO
# YOLOv8 segmentasyon modeli yükleniyor
model = YOLO('yolov8n-seg.pt')

# Test görüntüsü yükleniyor
img = 'dog.jpg'

# Segmentasyon işlemi gerçekleştiriliyor
results = model.predict(source=img, save=True)  # save plotted images
