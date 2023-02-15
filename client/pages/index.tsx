import { useSockets } from "../context/socket.context";

import { useEffect, useRef, useState } from "react";
import LoginContainer from "../containers/Login";

enum EScreen{
  LOGIN="LOGIN",
  REGISTER="REGISTER"
}

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const [screen,setScreen]=useState<EScreen>(EScreen.LOGIN);
  const usernameRef = useRef(null);

  // useEffect(() => {
  //   if (usernameRef)
  //     usernameRef.current.value = localStorage.getItem("username") || "";
  // }, []);

  return (
    <LoginContainer/>
    // <div>
    //   {
    //     screen===EScreen.LOGIN ? <LoginContainer/> : <RegisterContainer/>
    //   }
    //   {!username && (
    //     <div className={styles.usernameWrapper}>
    //       <div className={styles.usernameInner}>
    //         <input placeholder="Username" ref={usernameRef} />
    //         <input placeholder="Password" ref={usernameRef} />
    //         <button className="cta" onClick={handleLogin}>
    //           START
    //         </button>
    //       </div>
    //     </div>
    //   )}
    //   {username && (
    //     <div className={styles.container}>
    //       <RoomsContainer />
    //       <MessagesContainer />
    //     </div>
    //   )}
    // </div>
  );
}
