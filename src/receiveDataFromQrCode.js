export function receiveDataFromQrCode(userDataString) {
  const userDataObject = {};
  const userDataStringCopy = userDataString;

  if (userDataStringCopy === '') {
    return null;
  }

  userDataStringCopy
    .split('\n')
    .map(sentence => sentence.split(':'))
    .map((value) => {
      userDataObject[value[0]] = value[1];
    });

  let firstAndLastName;

  if (userDataObject.N !== undefined) {
    firstAndLastName = userDataObject.N.split(';').join(' ');
  }

  const userInfo = {
    id: new Date().getTime(),
    name: firstAndLastName,
    email: userDataObject.EMAIL || userDataObject['EMAIL;TYPE=INTERNET'],
    phone: userDataObject.TEL,
  };
  const isUserInfo = Object.values(userInfo)
    .some(userInfo => userInfo === undefined);

  if (isUserInfo) {
    return null;
  }

  return userInfo;
}
