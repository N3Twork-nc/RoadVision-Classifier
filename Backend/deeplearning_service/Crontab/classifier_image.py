from torchvision import transforms
import schedule
import time
import torch
import threading
import logging
import torch.utils.data as data

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

def classifier_road():
    logging.info(f"Start classify road")
    model = torch.load("ResEViT_multiclass_model.pth")
    model.eval()
    road_list = make_datapath_list()
    road_image = MyDataset(road_list, transform=ImageTransform(224))
    rood_dataloader = torch.utils.data.DataLoader(road_image, 32, shuffle=True)
    predicts=[]
    for inputs in rood_dataloader:
        inputs=inputs.to(self.device)
        output = self.model(inputs)
        output = output.cpu()
        max_id = np.argmax(output.detach().numpy(),axis=1)
        predicts=np.concatenate((predicts,max_id))
    logging.info(f"Start classify road")


schedule.every(60).seconds.do(classifier_road)    # Chạy mỗi 10 giây
def run_schedule():
    while True:
        schedule.run_pending()  # Kiểm tra và chạy công việc
        time.sleep(1)

# Tạo một luồng để chạy schedule
logging.info(f"Start classify road")
schedule_thread = threading.Thread(target=run_schedule)
# schedule_thread.daemon = True  # Đảm bảo thread sẽ kết thúc khi chương trình chính kết thúc
schedule_thread.start()