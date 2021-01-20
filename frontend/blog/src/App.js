import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "./axios";

import Post from "./components/Post";
function App() {
  const [posts, setPosts] = useState([]);
  const[image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("")

const handleChange=(e)=>{
  if (e.target.files[0]) {
    let file = e.target.files[0]; 
    setImage(file)
 
}

}
  
const onhandleSubmit=async(e)=>{
e.preventDefault()
const formData= new FormData();
formData.append('title', title)
formData.append('description', description)
formData.append('image', image)
formData.append('timestamp',new Date().toLocaleString().replace(",","").replace(/:.. /," "))
  await axios.post('/post/new', formData).then((response)=>{
    console.log(response.data)
  }) .catch(err => {
    console.log(err);
 });


}


  useEffect(() => {
    axios.get("/post/sync").then((response) => {
      setPosts(response.data);
    });
  }, []);
 
  // useEffect(() => {
  //   const pusher = new Pusher('b3c0679efa7cdb520260', {
  //     cluster: 'eu'
  //   });

  //   const channel = pusher.subscribe('posts');
  //   channel.bind('inserted', (newPost)=> {
  //     alert(JSON.stringify(newPost));
  //       setPosts([...posts,newPost ])
  //   });
  //   return()=>{
  //     channel.unbind_all()
  //     channel.unsubscribe()
  //   }
  // }, [posts])


  return (
    <div className="App">
      <form onSubmit={onhandleSubmit} encType="multipart/form-data">
        <div>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
        </div>
        <div>
      
          <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}placeholder="description"/>
        </div>
        <div>
   
          <input type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleChange}/>
        </div>

        <button type="submit">Submit</button>
      </form>

      <Post posts={posts} />
    </div>
  );
}

export default App;
