import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./VideoCall.css";

function VideoCall() {

  const [form, setForm] = useState({
    appointment: "",
    doctor: "",
    patient: ""
  });

  const [room, setRoom] = useState("");
  const [inCall, setInCall] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const createVideoSession = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(

      "http://localhost:5000/api/video/create",

      form,

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    setRoom(res.data.session.roomId);

    alert("Video Session Created ✅");

  }

  catch (error) {

    console.log(error);

    alert(

      error.response?.data?.message ||

      "Something went wrong"

    );

  }

};

const initializeCall = async () => {

  try {

    const stream = await navigator.mediaDevices.getUserMedia({

      video: true,

      audio: true

    });

    localStreamRef.current = stream;

    if (localVideoRef.current) {

      localVideoRef.current.srcObject = stream;

    }

    socketRef.current = io("http://localhost:5000");

    socketRef.current.emit(

      "join-room",

      room

    );

    peerRef.current = new RTCPeerConnection({

      iceServers: [

        {

          urls: "stun:stun.l.google.com:19302"

        }

      ]

    });

    stream.getTracks().forEach(track => {

      peerRef.current.addTrack(

        track,

        stream

      );

    });

    setInCall(true);

  }

  catch (error) {

    console.log(error);

    alert("Camera / Microphone Permission Denied");

  }

};
useEffect(() => {

  if (!socketRef.current || !peerRef.current) return;

  peerRef.current.ontrack = (event) => {

    if (remoteVideoRef.current) {

      remoteVideoRef.current.srcObject = event.streams[0];

    }

  };

  peerRef.current.onicecandidate = (event) => {

    if (event.candidate) {

      socketRef.current.emit(

        "ice-candidate",

        {

          roomId: room,

          candidate: event.candidate

        }

      );

    }

  };

  socketRef.current.on(

    "offer",

    async (offer) => {

      await peerRef.current.setRemoteDescription(

        new RTCSessionDescription(offer)

      );

      const answer = await peerRef.current.createAnswer();

      await peerRef.current.setLocalDescription(answer);

      socketRef.current.emit(

        "answer",

        {

          roomId: room,

          answer

        }

      );

    }

  );

  socketRef.current.on(

    "answer",

    async (answer) => {

      await peerRef.current.setRemoteDescription(

        new RTCSessionDescription(answer)

      );

    }

  );

  socketRef.current.on(

    "ice-candidate",

    async (candidate) => {

      try {

        await peerRef.current.addIceCandidate(

          new RTCIceCandidate(candidate)

        );

      }

      catch (err) {

        console.log(err);

      }

    }

  );

  return () => {

    socketRef.current?.disconnect();

  };

}, [room]);
const endCall = () => {

  if (localStreamRef.current) {

    localStreamRef.current.getTracks().forEach(track => track.stop());

  }

  if (peerRef.current) {

    peerRef.current.close();

  }

  if (socketRef.current) {

    socketRef.current.disconnect();

  }

  setInCall(false);

  setRoom("");

};

return (

<div className="video-page">

<div className="video-card">

<h1>Video Consultation 🎥</h1>

<p>Secure Doctor - Patient Video Call</p>

{role === "patient" ? (

<form onSubmit={createVideoSession}>

<input
name="appointment"
placeholder="Appointment ID"
value={form.appointment}
onChange={handleChange}
required
/>

<input
name="doctor"
placeholder="Doctor ID"
value={form.doctor}
onChange={handleChange}
required
/>

<input
name="patient"
placeholder="Patient ID"
value={form.patient}
onChange={handleChange}
required
/>

<button type="submit">
Create Room
</button>

</form>

) : (

<div>

<input
type="text"
placeholder="Enter Room ID"
value={room}
onChange={(e)=>setRoom(e.target.value)}
/>

<button
type="button"
onClick={initializeCall}
>
Join Room
</button>

</div>

)}

{room && (

<div className="room-box">

<h2>Room Created ✅</h2>

<p>{room}</p>

<button
type="button"
onClick={initializeCall}
>
Start Call
</button>

</div>

)}

{inCall && (

<div className="video-container">

<div className="video-box">

<h3>Your Video</h3>

<video
ref={localVideoRef}
autoPlay
playsInline
muted
/>

</div>

<div className="video-box">

<h3>Remote Video</h3>

<video
ref={remoteVideoRef}
autoPlay
playsInline
/>

</div>

<button
className="end-btn"
type="button"
onClick={endCall}
>
End Call
</button>

</div>

)}

</div>

</div>

);

}

export default VideoCall;