

module.exports = {
    changePass(hash) {
        return `<html>
                 <head>
                     <h3>
                         You are requested for a password Change
                     </h3>
                 </head>
                 <body>
                     <p>Please enter the Below OTP <br/> 
                    <strong> ${hash} </strong>
                      </p>
                 </body>
             </html>`
    }
}