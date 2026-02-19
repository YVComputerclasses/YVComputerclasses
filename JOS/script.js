function showPopup(service) {
  const popupTitle = document.getElementById("popup-title");
  const docList = document.getElementById("doc-list");
  const extraInfo = document.getElementById("extra-info");

  if (service === "A") {
    popupTitle.textContent = "આધાર કાર્ડ માં સરનામું બદલવા માટે";
    docList.innerHTML = `
      <li>ચુંટણીકાર્ડ</li>
      <li>ગેજેટ ઓફોસ</li>
      <li>રેશન કાર્ડ</li>
      <li>લાઈટ બીલ</li>
      <li>મેરેજ સર્ટીફીકેટ</li>
      <li>ગેસ બીલ</li>
      <li>બેંક પાસબૂક</li>
      <li>ST/SC/OBC સર્ટીફીકેટ</li>
      <li>ઇન્ડિયન પાસપોટ</li>
      <li>રહેવાસી નો દાખલો</li>
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
  }else if (service === "F") {
    popupTitle.textContent = "વહલી દીકરી યોજના";
    docList.innerHTML = `
      <li>દીકરી પાસપોર્ટ સાઈઝ ફોટો.</li>
      <li>દીકરી આધાર કાર્ડ.</li>
      <li>દીકરી જન્મ દાખલો</li>
      <li>દીકરી બેંક પાસબૂક</li>
      <li>માતા પિતા નુ આધાર કાર્ડ</li>
      <li> આવક નો દાખલો</li>
      <li>માતા પિતા લગ્ન નુ પ્રમાણ પત્ર</li>
      <li>રેસન કાર્ડ</li>
      <li>માતા પિતા નો જન્મ નો દાખલો</li>
      <li>માતા પિતાનું પાન કાર્ડ અને ચુંટણી કાર્ડ</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }else if (service === "G") {
    popupTitle.textContent = "નવું પાનકાર્ડ બનાવવા માટે";
    docList.innerHTML = `
      <li>પાસપોર્ટ સાઈઝ ફોટો 2 નંગ.</li>
      <li>આધાર કાર્ડ.</li>
      <li>પિતા/પતિ નુ આધાર કાર્ડ.</li>
      <li>સફેદ કાગળ પર સહી</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }else if (service === "H") {
    popupTitle.textContent = "લાઈટ બીલ માં નામ બદલવા માટે ( વારસાઈ )";
    docList.innerHTML = `
      <li>એગ્રીમેન્ટ સ્ટેમ્પ (વકીલ દ્વારા બનાવેલ).</li>
      <li>લાઈટ બીલ.</li>
      <li>ઘરની આકારણી.</li>
      <li>પિતા નો મરણ નો દાખલો.</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }else if (service === "I") {
    popupTitle.textContent = "ખેડૂત 2000 સહાય ફોર્મ ભરવા માટે";
    docList.innerHTML = `
      <li>પાસપોર્ટ સાઈઝ ફોટો.</li>
      <li>આધાર કાર્ડ.</li>
      <li>પિતા/પતિ/પત્ની નુ આધાર કાર્ડ.</li>
      <li>મરણ નો દાખલો</li>
      <li>બેંક પાસબૂક</li>
      <li>૮અ નકલ</li>
      <li>7/12 નકલ</li>
      <li>6 હક પત્રક</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }else if (service === "J") {
    popupTitle.textContent = "કુંવરબાઈ નું મામેરું સહાય ફોર્મ ભરવા માટે";
    docList.innerHTML = `
      <li>છોકરી પાસપોર્ટ સાઈઝ ફોટો.</li>
      <li>આધાર કાર્ડ.</li>
      <li>પિતા નુ આધાર કાર્ડ.</li>
      <li>પતિ નુ આધાર કાર્ડ.</li>
      <li>બેંક પાસબૂક</li>
      <li>લગ્ન નુ પ્રમાણ પત્ર</li>
      <li>રેસન કાર્ડ</li>
      <li>આવકનો દાખલો પિતા નો</li>
    `;
    extraInfo.textContent = "દરેક દસ્તાજેજ ની 1 ક્ષેરોક્ષ સાથે લાવી. આભાર";
  }

  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
