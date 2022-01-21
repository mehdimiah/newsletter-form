//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({ extended: true }));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
//Setting up MailChimp
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
    apiKey: "d5a0a38292a8ae3433cb04e5952cea33-us20",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
    server: "us20"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req, res) {
    //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
    const firstName = req.body.FirstName;
    const secondName = req.body.LastName;
    const email = req.body.Email;
    //*****************************ENTER YOU LIST ID HERE******************************
    const listId = "5310a3c977";
    //Creating an object with the users data
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };
    //Uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });

            res.sendFile(__dirname + "/success.html")
            console.log(`Successfully added contact as an audience member.`);
        
        //If all goes well logging the contact's id

    }
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.get("/success",function(req,res){
    res.sendFile(__dirname  + "/success.html")
})

app.post("/failure", function (req, res) {
    var button1 = req.body.button

    if (button1 == 'home') {
        res.redirect("/")
    }else (button1 == 'success'); {
        res.redirect("/success")
    }
})


// api key
// d5a0a38292a8ae3433cb04e5952cea33-us20
// audience ID
// 5310a3c977
