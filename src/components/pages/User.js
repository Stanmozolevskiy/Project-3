import React from "react";
import NavTabs from "../NavTabs"



fileChangedHandler = (event) => {
    const file = event.target.files[0];
}

// upLoadHandler = () => {
//     state = {selectedFile: null}
// }

upLoadHandler = () => {
    const formData = new FormData()
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios.post('/api/userForm', formData)
  }

function User () {
    return (
        <div className="container">
        <h1>Welcome to fitness first! // grab username from the database </h1>
        <img src="#image the user can add" />
        <form>
            <input type="file" onChange={this.fileChangedHandler}> </input>
            <button onClick={this.upLoadHandler}>Upload </button>
            <input type="text" name="firstname"> </input>
            <input type="text" name="lastname"> </input>


        </form>
        </div>
    )
}

export default User;
