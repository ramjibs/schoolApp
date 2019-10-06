

module.exports = {
    emailtemplate(id, password) {
        return `<html>
                 <head>
                     <h3>
                         You have been Successfully Registered
                     </h3>
                 </head>
                 <body>
                     <p>Please you below Credentials to login <br/> User ID: ${id} <br/> Password: ${password} <br/> </p>
                 </body>
             </html>`
    }
}