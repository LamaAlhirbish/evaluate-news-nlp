function handleSubmit(event) {
    event.preventDefault()
    const URL = "http://localhost:8083/test";

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    if (Client.checkFormText(formText)) {
        console.log("::: Form Submitted :::");

        postData (URL, {"formText": formText})
        .then(function(data) {
            document.getElementById('results').innerHTML =  `<p> Text: ${data.text} </p>
                <p> Polarity: ${data.polarity} </p>
                <p> Subjectivity: ${data.subjectivity} </p>
                <p> Polarity Confidence: ${data.polarity_confidence} </p>
                <p> Subjectivity Confidence: ${data.subjectivity_confidence} </p>`
        })
    } else {
        alert("Enter Valid URL");
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {} ) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)        
  });

  try {
      const newData = await res.json();
      console.log(`newData: ${newData}`);
      return newData;
  } catch(err) {
      console.log("error", err);
  }
}

export { handleSubmit }