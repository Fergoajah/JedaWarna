document.addEventListener('DOMContentLoaded', () => {
    const mainColorPicker = document.getElementById('mainColorPicker');
    const selectedColorDisplay = document.querySelector('.selected-color-display');
    const hexValueSpan = document.getElementById('hexValue');
    const rgbValueSpan = document.getElementById('rgbValue');
    const addToPaletteBtn = document.getElementById('addToPaletteBtn');
    const paletteContainer = document.getElementById('paletteContainer');
    const clearPaletteBtn = document.getElementById('clearPaletteBtn');

    // Fungsi untuk mengonversi HEX ke RGB
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        // Handle 3-digit hex
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // Handle 6-digit hex
        else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Update display saat warna di color picker berubah
    mainColorPicker.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        selectedColorDisplay.style.backgroundColor = selectedColor;
        hexValueSpan.textContent = selectedColor.toUpperCase();
        rgbValueSpan.textContent = hexToRgb(selectedColor);
    });

    // Tambahkan warna ke palet
    addToPaletteBtn.addEventListener('click', () => {
        const currentColor = mainColorPicker.value;
        const currentHex = currentColor.toUpperCase();
        const currentRgb = hexToRgb(currentColor);

        const paletteItem = document.createElement('div');
        paletteItem.classList.add('palette-item');
        paletteItem.style.backgroundColor = currentColor;
        paletteItem.innerHTML = `
            <span class="color-value">${currentHex}</span>
            <button class="remove-btn">x</button>
        `;

        // Tambahkan event listener untuk tombol hapus
        const removeBtn = paletteItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            paletteItem.remove();
        });

        paletteContainer.appendChild(paletteItem);
    });

    // Bersihkan semua warna di palet
    clearPaletteBtn.addEventListener('click', () => {
        paletteContainer.innerHTML = ''; // Hapus semua inner HTML
    });

    // Inisialisasi tampilan warna saat halaman dimuat
    // Memastikan tampilan awal sesuai dengan nilai default input type="color"
    const initialColor = mainColorPicker.value;
    selectedColorDisplay.style.backgroundColor = initialColor;
    hexValueSpan.textContent = initialColor.toUpperCase();
    rgbValueSpan.textContent = hexToRgb(initialColor);
});