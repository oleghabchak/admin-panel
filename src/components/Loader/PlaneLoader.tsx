import React from "react";
import Lottie from "react-lottie";
import animationData from "./../../assets/animation/hFW7hbg0Ia-2.json";

interface PlaneLoaderProps {
  inProgress?: boolean;
}

export default class PlaneLoader extends React.Component<PlaneLoaderProps> {
  constructor(props: PlaneLoaderProps) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className={`w-full h-125 flex flex-col justify-center items-center align-middle`}>
        <Lottie options={defaultOptions} height={200} width={400} />
        {this.props.inProgress &&
        <>
        <h1 className="text-title-lg m-4">Page Under Construction</h1>
        <p>We are working hard to bring you new content. Check back soon!</p>
        </>}
      </div>
    );
  }
}