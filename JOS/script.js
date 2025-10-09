function showPopup(service) {
  const popupTitle = document.getElementById("popup-title");
  const docList = document.getElementById("doc-list");
  const extraInfo = document.getElementById("extra-info");

  if (service === "A") {
    popupTitle.textContent = "આધાર કાર્ડ માં સરનામું બદલવા માટે";
    docList.innerHTML = `
      <li></li>
      <li></li>
      <li></li>
    `;
    extraInfo.textContent = "આભાર";
  } else if (service === "B") {
    popupTitle.textContent = "નવા ચુંટણીકાર્ડ માટે";
    docList.innerHTML = `
      <li>પાસપોર્ટ સાઈઝ નો તાજેતર નો ફોટો.</li>
      <li>સ્કૂલ છોડયા નું પ્રમાણપત્ર અથવા જન્મ દાખલો.</li>
      <li>આધાર કાર્ડ તથા રેશનકાર્ડ નકલ</li>
      <li>મેરેજ સર્ટી અથવા કંકોત્રી નકલ</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }else if (service === "C") {
    popupTitle.textContent = "ચુંટણીકાર્ડ મા સરનામું બદલવા માટે";
    docList.innerHTML = `
      <li>પાસપોર્ટ સાઈઝ નો તાજેતર નો ફોટો.</li>
      <li>ચુંટણીકાર્ડ</li>
      <li>લાઈટબીલ / રેશનકાર્ડ / ગેસ બીલ અથવા ઘરવેરા પાવતીની નકલ</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }else if (service === "D") {
    popupTitle.textContent = "ચુંટણીકાર્ડ મા નામ / અટક / જન્મતારીખ / સબંધ / ફોટો સુધારવા માટે";
    docList.innerHTML = `
      <li>ચુંટણીકાર્ડ</li>
      <li>પાસપોર્ટ સાઈઝ નો તાજેતર નો ફોટો.</li>
      <li>સ્કૂલ છોડયા નું પ્રમાણપત્ર અથવા જન્મ દાખલો. ( નામ / અટક / અથવા જન્મ તારીખ સુધારવા માટે)</li>
      <li>લાઈટબીલ / રેશનકાર્ડ / ગેસ બીલ અથવા ઘરવેરા પાવતીની નકલ ( સરનામું સુધારવા માટે)</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }else if (service === "E") {
    popupTitle.textContent = "ચુંટણીકાર્ડ મા પતિ નુ નામ ચડાવા માટે";
    docList.innerHTML = `
      <li>પત્ની નો પાસપોર્ટ સાઈઝ નો તાજેતર નો ફોટો.</li>
      <li>પત્ની નુ સ્કૂલ છોડયા નું પ્રમાણપત્ર અથવા જન્મ દાખલો.</li>
      <li>પતિ અને પત્ની નુ આધાર કાર્ડ </li>
      <li>પતિ નુ રેશનકાર્ડ નકલ</li>
      <li>મેરેજ સર્ટી અથવા કંકોત્રી નકલ</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }

  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
