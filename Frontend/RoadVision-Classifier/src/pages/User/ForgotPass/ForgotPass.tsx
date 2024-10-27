import EnterEmail from "../../../components/ForgotPass/EnterEmail";
import SendSuccess from "../../../components/ForgotPass/SendSucess";
import { Carousel } from "antd";
import { useRef, } from "react";

const contentStyle: React.CSSProperties = {
    margin: 0,
    minHeight: "300px", 
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  
  export default function ForgotPass() {
  //  const [checkEmail, setCheckEmail] = useState(false);
    const carouselRef = useRef<any>(null);

    const handleNextSlide = () => {
      carouselRef.current?.next();
    };
  
    return (
      <Carousel ref={carouselRef} arrows={false} draggable={false} swipeToSlide={false}>
        <div style={contentStyle}>
          <EnterEmail onContinue={handleNextSlide}/> 
        </div>
        <div style={contentStyle}>
          <SendSuccess />
        </div>
      </Carousel>
    );
  }