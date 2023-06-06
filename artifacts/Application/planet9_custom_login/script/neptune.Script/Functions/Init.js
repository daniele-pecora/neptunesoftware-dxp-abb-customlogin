let formLogons = [];
let text1 = '';
let text2 = '';
let text3 = '';

// Custom Login App - Mobile Client
let isMobile = false;
if (typeof AppCache !== 'undefined' && AppCache.isMobile) isMobile = true;

// Add Function to AppCache object when inside Launchpad
if (isMobile) AppCache.loginAppSetSettings = logonScreen.setSettings;

// Forgot Password
const url = new URL(location.href);
const searchParams = url.searchParams;
const token = searchParams.get('token');

if (token) {
    formLogin.setVisible(false);
    formForgot.setVisible(false);
    formNewPassord.setVisible(true);
    
    const passwordReason = searchParams.get('reason');
    if (passwordReason === 'expired') {
        txtFormNewPassRequired.setVisible(false);
        txtFormNewPassExpired.setVisible(true);
    } else {
        txtFormNewPassRequired.setVisible(true);
        txtFormNewPassExpired.setVisible(false);
    }
}

// Startup
if (!isMobile) {
    localStorage.removeItem('p9azuretoken');
    localStorage.removeItem('p9azuretokenv2');
    setTimeout(function () {
        logonScreen.getLogonTypes();
    }, 10);
}

// Phone 
setTimeout(function () {
    if (sap.ui.Device.system.phone) {
        flexLogon.setHeight('100%');
        flexLogon.setWidth('100%');
        flexLogon.addStyleClass('nepFlexPhone');
        panLogonLocal.setWidth('100%');
        panLogonLocal.setHeight('100%');
        panLogonLocal.removeStyleClass('nepPanLogonBorder');
    }
}, 100);

// Sorter Function
let sort_by = function (field, reverse, primer) {
    let key = primer ?
        function (x) {
            return primer(x[field])
        } :
        function (x) {
            return x[field]
        };
    reverse = !reverse ? 1 : -1;
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}