from torchvision import transforms
import schedule
import torch
import logging
import torch.utils.data as data
from kafka import KafkaConsumer
import json
from PIL import Image
from io import BytesIO
import base64

# Cấu hình logging
logging.basicConfig(filename='app.log',  # Tên file log
                    level=logging.DEBUG,  # Mức độ log
                    format='%(asctime)s - %(threadName)s - %(levelname)s - %(message)s')  # Định dạng log

road_image_path="road_image"

class ImageTransform():
    def __init__(self, resize, mean =(0.485, 0.456, 0.406), std =  (0.229, 0.224, 0.225)):
        self.data_transform = {
             'Test':  transforms.Compose([
                transforms.RandomResizedCrop(resize, scale=(0.7,1.0)),
                transforms.ToTensor(),
                transforms.Normalize(mean=mean, std=std)])
        }
    
    def __call__(self, img, phase='Test'):
        return self.data_transform[phase](img)

class MyImage(data.Dataset):
    def __init__(self, file_list, transform=None, phase="Train"):
        self.file_list = file_list
        self.transform = transform
        self.phase = phase
        
    def __len__(self):
        return len(self.file_list)

    def __getitem__(self, idx):
        try: 
            img_path = self.file_list[idx]
            img = Image.open(img_path)
            img_transformed = self.transform(img)
            return img_transformed
        except  Exception as e:  
            print(e,img_path)

class MyDataset(data.Dataset):
    def __init__(self, file_list, transform=None):
        self.file_list = file_list
        self.transform = transform
        
    def __len__(self):
        return len(self.file_list)

    def __getitem__(self, idx):
        try: 
            img_path = self.file_list[idx]
            img = Image.open(img_path)
            img_transformed = self.transform(img, self.phase)
            return img_transformed
        except  Exception as e:  
            print(img.size)
            print(e,img_path)

def make_datapath_list():
    target_path = os.path.join(road_image_path, "*.jpg")
    path_list = []
    for path in glob.glob(target_path):
        path_list.append(path)
    return path_list

def classifier_road(img):
    img=ImageTransform(224)(img)
    model = torch.load("./ResEViT_multiclass_model.pth",map_location=torch.device('cpu'))
    model.eval()
    return model(img)


consumer=consumer = KafkaConsumer(
    'image',
    bootstrap_servers='192.168.120.26:9092',
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))  # Deserialize JSON từ bytes
)
for message in consumer:
    try:
        json_data = message.value
        image_data = base64.b64decode(json_data['file'])
        print(json_data)
        image = Image.open(BytesIO(image_data))
        if image.mode != 'RGB':
            image = image.convert('RGB')
        classifier_road(image)
        print(json_data)
    except Exception as e:
        print(e)
        continue