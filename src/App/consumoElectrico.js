/**
 * Calcula la energía eléctrica consumida por la sesión actual
 */
export const getEnergyConsumption = () => {
    // 1. Obtenemos el total de bytes transferidos (imágenes, scripts, datos de Firebase)
    const resources = performance.getEntriesByType('resource');
    const totalBytes = resources.reduce((acc, res) => acc + (res.transferSize || 0), 0);

    // 2. Convertimos a Gigabytes
    const totalGB = totalBytes / (1024 ** 3);

    // 3. Coeficiente: 0.06 kWh por cada GB (Dato promedio de red y dispositivo)
    const energyKWh = totalGB * 0.06;

    // 4. Pasamos a Watt-hora (Wh) para que sea una cifra más fácil de leer
    const energyWh = energyKWh * 1000;

    return {
        bytes: totalBytes,
        kilobytes: (totalBytes / 1024).toFixed(2),
        wattHora: energyWh.toFixed(4)
    };
};