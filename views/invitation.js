module.exports = {
    invitation( otp,link, schoolName )  {
        return `<html>
        <head>
            <h3>
                You are Invited to join in the school ${ schoolName }
            </h3>
        </head>
        <body>
            <p>click on this Link $${ link } and Please enter the Below OTP to accept the invitaton or else you can ignore this mail. Note: Invitation will be valid for one day only. <br/> 
           <strong> ${otp} </strong>
             </p>
        </body>
    </html>`
    }
}