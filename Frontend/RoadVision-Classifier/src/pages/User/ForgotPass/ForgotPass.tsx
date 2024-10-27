import EnterEmail from "../../../components/ForgotPass/EnterEmail";
import SendSuccess from "../../../components/ForgotPass/SendSucess";
import { Carousel } from "antd";
import { useRef, useState } from "react";

  
  export default function ForgotPass() {

    const carouselRef = useRef<any>(null);
    const [isSendSuccessVisible, setSendSuccessVisible] = useState(false);

    const handleNextSlide = () => {
      setSendSuccessVisible(true);
      carouselRef.current?.next();
    };
  
    return (
      <Carousel ref={carouselRef} arrows={false} draggable={false} swipeToSlide={false}>
        <div>
          <EnterEmail onContinue={handleNextSlide}/> 
        </div>
        {isSendSuccessVisible && (
        <div>
          <SendSuccess />
        </div>
      )}
      </Carousel>
    );
  }