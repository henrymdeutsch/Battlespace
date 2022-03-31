/* Visibility of modals */
function revealModal(num) {
    modalNum = num.toString();
    modalIdString = 'portfolioModal' + modalNum;
    modal = document.getElementById(modalIdString);
    console.log('selecting for id ' + 'portfolioModal' + modalNum);
    modal.style.opacity = '1';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';

    /* TODO */
    /* the paypal thing has an id, so try to add that id to its parent when the modal is revealed, and delete it when it's hidden */
    var targetDiv = document.getElementById('portfolioModal2');
    targetDiv = targetDiv.children.item(0).children.item(0).children.item(1).children.item(0).children.item(2);
    console.log('here she is: ' + targetDiv.innerHTML);
    targetDiv.innerHTML = '<div id="paypal-button-container"></div>';
    renderPaypalButtions();

    deleteWeirdShowInShit();
}

function hideModal(num) {
    modalNum = num.toString();
    modal = document.getElementById('portfolioModal' + modalNum);
    modal.style.opacity = '0';
    modal.style.zIndex = '-1';

    removeBlackBackground();
}

function blackenBackground() {
    bodyEl = document.getElementById('blackCurtainz');  /* name is sensitive for some fucking reason */
    bodyEl.style.zIndex = '700';
    bodyEl.style.opacity = '30%';
    console.log('but got here');
}

function removeBlackBackground() {
    bodyEl = document.getElementById('blackCurtainz');
    console.log(bodyEl);
    if (bodyEl != null) {
        bodyEl.style.display = 'none';
        bodyEl.style.opacity = '0';
        bodyEl.style.zIndex = '-999';
    }
}

function deleteWeirdShowInShit() {
  /* clicking the background makes it disappear. maybe instead of trying to stop, make main thing disappear too. */
    setTimeout(function() {
        els = document.getElementsByClassName('show');
        console.log('got em right here: ' + els.length);
        for (var i = 0; i < els.length; i++) {
            if (els[i].classList.contains('in')) {
                els[i].classList.remove('in');
            }
            els[i].classList.remove('show');
        }
        els.onclick = "";
    }, 1000);
}


/* Paypal functionality */
(function renderPaypalButtions() {
  paypal.Buttons({

    // Sets up the transaction when a payment button is clicked
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '0.01' // Can reference variables or functions. Example: `value: document.getElementById('...').value`
          }
        }]
      });
    },

    // Finalize the transaction after payer approval
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
            // Print address
            var street, city, state, postal_code, country;
            var a = orderData.purchase_units[0].shipping.address;
            [street, city, state, postal_code, country] = [a["address_line_1"], a["admin_area_2"], a["admin_area_1"], a["postal_code"], a["country_code"]];
            console.log(`Full Address: ${street}, ${city}, ${state}, ${postal_code} ${country}`);
            
            // Print order data
            console.log('Order data:', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures;

            // Send email
            Email.send({
            Host : "smtp.yourisp.com",
            Username : "username",
            Password : "password",
            To : 'them@website.com',
            From : "you@isp.com",
            Subject : "This is the subject",
            Body : "And this is the body"
            }).then(
              message => alert(message)
            );
            // alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            console.log('[send email]');

        // When ready to go live, remove the alert and show a success message within this page. For example:
        // var element = document.getElementById('paypal-button-container');
        // element.innerHTML = '';
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
      });
    }
  }).render('#paypal-button-container');
})();


/* Get modal command from url, if it's there */
/* paste at top of url: open-modal=1& */
var urlAppended = window.location.href;
var numAppended;
relevantStart = urlAppended.indexOf("?open-modal=");
relevantEnd = urlAppended.indexOf('&');
if (relevantStart != -1 && relevantEnd != -1) {
    // If you're going to open a modal, scroll to books section
    // document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    // and try to blacken background
    blackenBackground();
    console.log('called this');

    numAppended = urlAppended.slice(relevantStart + 12, relevantEnd);
    numAppended = parseInt(numAppended);
    revealModal(numAppended);
}


