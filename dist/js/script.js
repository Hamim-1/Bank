let user = {
    totalBalance: 0,
    totalDeposit: 0,
    totalWithdraw: 0
};
function showPassword(icon) {
    const input = icon.previousElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-solid fa-eye-slash pr-2';
    } else {
        input.type = 'password';
        icon.className = 'fa-regular fa-eye pr-2';
    }
}


const deposit = document.getElementById('deposit');
const withdraw = document.getElementById('withdraw');
const balance = document.getElementById('balance');
const mainBalance = document.getElementById('main-balance');


const pages = ['home-page', 'history-page', 'profile-page'];
const sections = ['profile-information-section', 'change-password-section'];



function changePage(pageId) {
    pages.forEach(page => {

        if (pageId === page) {
            document.getElementById(page).style.display = 'block';
        } else {
            document.getElementById(page).style.display = 'none';
        }

    })
    closeMenu();
}

function changeSection(sectionId) {
    sections.forEach(section => {

        if (sectionId === section) {
            document.getElementById(section).style.display = 'block';
        } else {
            document.getElementById(section).style.display = 'none';
        }

    })
}

const menuBar = document.getElementById('menu-bar');
function openMenu() {
    if (menuBar.classList.contains('-left-full')) {
        menuBar.classList.replace('-left-full', 'left-0');
    }
}

function closeMenu() {
    if (!menuBar.classList.contains('-left-full')) {
        menuBar.classList.replace('left-0', '-left-full');
    }
}

const changeOptionSection = document.getElementById('change-option');
const depositSection = document.getElementById('deposit-section');
const withdrawSection = document.getElementById('withdraw-section');
const profileSection = document.getElementById('profile-page');
const historySection = document.getElementById('history-section')
const EmtyHistoryMessage = document.getElementById('emty-history-message');



function saveData() {
    localStorage.setItem('userData', JSON.stringify(user));
}


depositSection.addEventListener('submit', depositMoney);
withdrawSection.addEventListener('submit', withdrawMoney);


function AddTransactionHistory(transactionData) {
    const ul = document.createElement('ul');
    const currenDate = new Date();
    const date = currenDate.getDate() < 10 ? `0${currenDate.getDate()}` : currenDate.getDate();
    const month = currenDate.getMonth() < 9 ? `0${currenDate.getMonth() + 1}` : currenDate.getMonth() + 1;
    const year = currenDate.getFullYear();

    ul.className = "flex justify-around";
    ul.innerHTML = `<li class="w-1/3 text-center">${date}-${month}-${year}</li>
                    <li class="w-1/3 text-center">${transactionData.transactionName}</li>
                    <li class="w-1/3 text-center">$${transactionData.ammount}</li>`;
    historySection.appendChild(ul);

    user.transactionHistory = historySection.innerHTML;
    saveData();
}


function depositAndWithdraw(obj) {
    const ammount = obj.ammount;
    if (ammount == '' || ammount == ' ') {
        setError(obj.name + ' Input is Emty')
    }
    else if (user.totalBalance < ammount && obj.name === 'Withdraw') {

        setError('You have insufficient funds');
    }
    else if (ammount < 20) { }
    else if (ammount > 20000) { }
    else {
        return true;
    }
}

function depositMoney(e) {
    e.preventDefault();
    const input = e.target.querySelector('input')
    const depositAmmount = Number(input.value);
    const isDeposit = depositAndWithdraw({ name: 'Deposite', ammount: depositAmmount })

    if (isDeposit) {
        if (user.totalDeposit === 0) {
            historySection.innerHTML = '';

        }
        user.totalBalance += depositAmmount;
        user.totalDeposit += depositAmmount;
        balance.innerText = user.totalBalance;
        mainBalance.innerText = user.totalBalance;
        deposit.innerText = user.totalDeposit;

        AddTransactionHistory({ transactionName: 'Deposit', ammount: depositAmmount });
        input.value = '';
        saveData();
        input.value = '';
    }
}

function withdrawMoney(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const withdrawAmmount = Number(input.value);

    const isWithdraw = depositAndWithdraw({ name: 'Withdraw', ammount: withdrawAmmount });

    if (isWithdraw) {
        user.totalBalance -= withdrawAmmount;
        user.totalWithdraw += withdrawAmmount;
        balance.innerText = user.totalBalance;
        mainBalance.innerText = user.totalBalance;
        withdraw.innerText = user.totalWithdraw;
        AddTransactionHistory({ transactionName: 'Withdraw', ammount: withdrawAmmount });
        input.value = '';
        saveData();
        input.value = '';
    }
}

// this function change withdraw and deposite section
function changeOption() {
    if (changeOptionSection.value === 'deposit') {
        depositSection.style.display = 'flex';
        withdrawSection.style.display = 'none';
    } else {
        withdrawSection.style.display = 'flex';
        depositSection.style.display = 'none';
    }
}

changeOptionSection.addEventListener('change', changeOption);


window.addEventListener('resize', () => {
    if (window.innerWidth > 599) {

        withdrawSection.style.display = 'flex';
        depositSection.style.display = 'flex';
    } else if (window.innerWidth < 600) {

        if (changeOptionSection.value === 'deposit') {
            withdrawSection.style.display = 'none';
        } else {
            depositSection.style.display = 'none';
        }
    }

    if (window.innerHeight >= 850 && window.innerWidth < 599) {
        changeOptionSection.style.display = 'none';
        withdrawSection.parentNode.style.flexDirection = 'column';
        depositSection.style.display = 'flex';
        withdrawSection.style.display = 'flex';
    } else if (window.innerHeight <= 849 && window.innerWidth < 600) {
        changeOptionSection.style.display = 'block';
    } else {
        withdrawSection.parentNode.style.flexDirection = 'row';

    }

    if (window.innerHeight > 800 && window.innerWidth < 768) {
        profileSection.classList.add('absolute');
        profileSection.classList.add('bottom-5');
    } else {
        profileSection.classList.remove('absolute');
        profileSection.classList.remove('bottom-5');
    }
})


const errorMessage = document.getElementById('error-message');
let hideError;

function showError(message) {
    errorMessage.innerText = message;
    errorMessage.classList.replace('-top-full', 'top-14');
    hideError = setTimeout(() => {
        errorMessage.classList.replace('top-14', '-top-full');

    }, 3000);
}

function setError(message) {
    if (!errorMessage.className.includes('-top-full')) {
        clearInterval(hideError);
        errorMessage.classList.replace('top-14', '-top-full');
        setTimeout(() => setError(message), 100)
    } else {
        showError(message)
    }
}



const singUpForm = document.getElementById('singup-form');
const loginForm = document.getElementById('login-form');
const updatePasswordForm = document.getElementById('change-password-form');
const personalInformation = document.getElementById('personal-information');

function changePassword(e) {
    e.preventDefault();
    const oldpassInput = updatePasswordForm.querySelector('.old-pass input');
    const newpassInput = updatePasswordForm.querySelector('.new-pass input');
    const newpass2Input = updatePasswordForm.querySelector('.new-pass2 input');
    const oldpass = oldpassInput.value.trim();
    const newpass = newpassInput.value.trim();
    const newpass2 = newpass2Input.value.trim();
    if (oldpass === user.password) {
        if (newpass.length < 8 || newpass2.length < 8) {
            setError('Password should be min 8 letter')
        } else if (newpass != newpass2) {
            setError("New Password didn't match");
        } else if (newpass === newpass2) {
            user.password = newpass;
            saveData();
            setError('Password changed');
            oldpassInput.value = '';
            newpassInput.value = '';
            newpass2Input.value = '';
        }

    } else {
        setError('Old Password is wrong')
    }
}
updatePasswordForm.addEventListener('submit', changePassword);

function upDatePersonalInfo(e) {
    e.preventDefault();


    if (userName2.value.trim().length < 3) {
        setError('Name Have to be min 3 letter')
    } else if (uniqueName.value.trim()[0] != '@') {
        setError('You have to give @ at first in username')
    } else if (uniqueName.value.trim().length < 5) {
        setError('User Name have to be min 5 letter');
    } else if (uniqueName.value.includes(' ')) {
        setError('Please create a username without any spaces')

    } else {
        user.name = userName2.value;
        user.uniqueName = uniqueName.value;
        userName.innerText = userName2.value;
        saveData();
        setError('Changed')
    }

}

personalInformation.addEventListener('submit', upDatePersonalInfo)

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkSingUpForm(userName, userEmail, userPassword) {

    if (userName.length < 1) {
        setError('Name is required');
        return false;
    }
    else if (userEmail.length < 1) {
        setError('Email is required');
        return false;
    }
    else if (userPassword.length < 1) {
        setError('Password is required');
        return false;
    }
    else if (userName.length < 3) {
        setError('Name should be min 3 letter');
        return false;
    }
    else if (!isValidEmail(userEmail)) {
        setError('Email is not valid');
        return false;
    }
    else if (userPassword.length < 8) {
        setError('Password should be min 8 letter');
        return false;
    } else {
        return true;
    }
}

const loginSection = document.getElementById('login-form');
const singupSection = document.getElementById('singup-form');
const singInSection = document.getElementById('sing-in-section');
const mainPage = document.getElementById('main-page');

function showLoginSection() {
    loginSection.style.display = 'flex';
    singupSection.style.display = 'none';
}

function showSignupSection() {
    singupSection.style.display = 'flex';
    loginSection.style.display = 'none';
}

function createAccount(e) {
    e.preventDefault();
    const userName = e.target.querySelector('.name input').value.trim();

    const userEmail = e.target.querySelector('.email input').value.trim();
    const userPassword = e.target.querySelector('.password input').value.trim();
    if (checkSingUpForm(userName, userEmail, userPassword)) {
        user.name = userName;
        const lastName = user.name.split(" ");
        user.email = userEmail;
        user.password = userPassword;
        user.uniqueName = `@${lastName[lastName.length - 1]}002`;
        showLoginSection();
        saveData();

    }


}


function loginAccount(e) {
    e.preventDefault();
    const userEmail = e.target.querySelector('.email input').value.trim();
    const userPassword = e.target.querySelector('.password input').value.trim();

    if (userEmail === user.email && userPassword === user.password) {
        mainPage.style.display = 'block';
        singInSection.style.display = 'none';
        rememberIdPass();
        setUserInformation();
    } else {
        setError('Invalid email or password. Please try again')
    }
}




singUpForm.addEventListener('submit', createAccount);
loginForm.addEventListener('submit', loginAccount);


const logoutPopupSection = document.getElementById('logout-popup');

function logoutPopup() {
    if (logoutPopupSection.classList.contains('hidden')) {
        logoutPopupSection.classList.remove('hidden');

    } else {
        logoutPopupSection.classList.add('hidden');


    }
}


function logout() {
    mainPage.style.display = 'none';
    singInSection.style.display = 'flex';
    changePage('home-page');
    changeSection('profile-information-section')
    logoutPopup();
    loginIformationAotoFill();
}

const checkBox = document.getElementById('remember-section').querySelector('input');

function rememberIdPass() {
    if (checkBox.checked) {

        user.idPassAutoFill = true;
    } else {
        user.idPassAutoFill = false;
    }
    saveData();
}

const userName = document.getElementById('user-name');
const userName2 = document.getElementById('user-name2');
const userEmail = document.getElementById('user-email');
const uniqueName = document.getElementById('unique-name');

function setUserInformation() {
    userName.innerText = user.name;
    userName2.value = user.name;
    userEmail.value = user.email;
    uniqueName.value = user.uniqueName;
}
const loginEmail = loginForm.querySelector('.email input');
const loginPassword = loginForm.querySelector('.password input');
function loginIformationAotoFill() {
    if (user.idPassAutoFill) {
        loginEmail.value = user.email;
        loginPassword.value = user.password;
        checkBox.checked = true;
    } else {
        loginEmail.value = '';
        loginPassword.value = '';
        checkBox.checked = false;
    }
}

window.onload = () => {
    if (localStorage.getItem('userData')) {
        user = JSON.parse(localStorage.getItem('userData'));
        showLoginSection();
        mainBalance.innerText = user.totalBalance ? user.totalBalance : '000';
        balance.innerText = user.totalBalance ? user.totalBalance : '000';
        deposit.innerText = user.totalDeposit ? user.totalDeposit : '000';
        withdraw.innerText = user.totalWithdraw ? user.totalWithdraw : '000';
        setUserInformation();
        if (user.transactionHistory) {
            console.log(EmtyHistoryMessage);

            historySection.innerHTML = user.transactionHistory;
        }
    }
    loginIformationAotoFill();

}


