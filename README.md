# Messaging-System

rest API backend system that handing messages between users.

## Getting Started

```bash
git clone https://github.com/Almogma/Messaging-system.git
```
### Executing program

* importing the json file 'MsgSystemHeroku.postman_collection.json' into [POSTMAN](https://web.postman.co/)
* register to the system.
* login into the system with the given token that you have got from the registration.
* action any call that you want with the given token.


## Registration format

```bash
{
    "username": <name>,
    "password": <password>
}
```
put the format in the body of the 'POST register into the system' request and fill your details.

## Login format

```bash
{
    "username": <name>,
    "password": <password>
}
```
Put the format inside the body of the 'POST login into the system' request and fill your details.
You will get a token after this call, keep it to other calls.

## Write-Message format
 * First insert the token you were given at the login step inside the headers under the name 'auth-token'
 * insert as well Content-Type: appliaction/json.
```bash
{
    "Sender": <Sender_Name>,
    "Receiver": <Receiver_Name>,
    "Message": <Message>,
    "Subject": <Subject>,
    "Creation_date": <Date>
}
```
Put the format inside the body of the 'POST Write message' request and fill your details.
Your message will display after you make the call.


## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
