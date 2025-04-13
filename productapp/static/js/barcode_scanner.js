document.addEventListener("DOMContentLoaded", function () {
    const barcodeField = document.querySelector("#id_barcode");
  
    if (!barcodeField) return;
  
    // ปุ่มกล้อง
    const scanBtn = document.createElement("button");
    scanBtn.type = "button";
    scanBtn.textContent = "📷 สแกนบาร์โค้ด";
    scanBtn.style.marginLeft = "10px";
  
    barcodeField.parentNode.appendChild(scanBtn);
  
    scanBtn.addEventListener("click", () => {
      const scannerDiv = document.createElement("div");
      scannerDiv.id = "scanner";
      scannerDiv.style.width = "300px";
      scannerDiv.style.marginTop = "10px";
      barcodeField.parentNode.appendChild(scannerDiv);
  
      const qrScanner = new Html5Qrcode("scanner");
      qrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          barcodeField.value = decodedText;
          qrScanner.stop();
          scannerDiv.remove();
        }
      );
    });
  });
  


  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const searchBar = document.querySelector('input[name="q"]');
        if (!searchBar) return;

        const button = document.createElement("button");
        button.innerText = "📷 สแกนบาร์โค้ด";
        button.type = "button";
        button.style.marginLeft = "10px";
        button.classList.add("btn", "btn-info");

        searchBar.parentNode.appendChild(button);

        // กล่องแสดงกล้อง
        const scannerContainer = document.createElement("div");
        scannerContainer.id = "barcode-scanner";
        scannerContainer.style.display = "none";
        scannerContainer.style.marginTop = "10px";
        searchBar.parentNode.appendChild(scannerContainer);

        const html5QrCode = new Html5Qrcode("barcode-scanner");

        button.addEventListener("click", function () {
            if (scannerContainer.style.display === "none") {
                scannerContainer.style.display = "block";

                Html5Qrcode.getCameras().then(cameras => {
                    const cameraId = cameras[0].id;
                    html5QrCode.start(
                        cameraId,
                        {
                            fps: 10,
                            qrbox: { width: 250, height: 100 }
                        },
                        qrCodeMessage => {
                            searchBar.value = qrCodeMessage;
                            html5QrCode.stop().then(() => {
                                scannerContainer.style.display = "none";
                                document.querySelector('form[action=""]').submit();
                            });
                        },
                        errorMessage => {
                            console.log("Scan error:", errorMessage);
                        }
                    );
                });
            } else {
                html5QrCode.stop().then(() => {
                    scannerContainer.style.display = "none";
                });
            }
        });
    }, 500); // รอ DOM เสร็จจริง ๆ
});

