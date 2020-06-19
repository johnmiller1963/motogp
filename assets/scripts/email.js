/*
Who: John Miller
What: Javascript file with specific email functionality to work with the emailjs service.  Incorporates captcha.
Where: If any of this code can help you, feel free to copy and try it for your own solutions
When: 21 June 2020
*/

$('#contact-form').on('submit', function(event) {
    event.preventDefault(); // prevent reload

    const e1 = this.form_email.value;
    const e2 = this.form_email_confirm.value;
    const isMatch = e1 === e2;

    if ( !isMatch ){
        event.preventDefault();
        alert("Those emails don't match, please check and re-send!");
        return;
    };

    var formData = new FormData(this);

    formData.append('service_id', 'ionos');
    formData.append('template_id', 'website_enquiry');
    formData.append('user_id', 'user_8X3EQg7gIqpcEa9pn8u3o');
 
    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
    }).done(function() {
        alert('Thank you for your email, we will be in touch soon!');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });

    document.getElementById('contact-form').reset();
});
