/**
 * Estimación de consumo energético y CO2
 * Basado en el modelo Sustainable Web Design (0.81 kWh/GB)
 */
export const estimateSustainability = () => {
    // 1. Obtener transferencia total de la sesión en Bytes
    const resources = performance.getEntriesByType('resource');
    const transferBytes = resources.reduce((acc, res) => acc + (res.transferSize || 0), 0);
    const transferGB = transferBytes / (1024 ** 3);

    // 2. Constantes de consumo (Estándares de la industria)
    const KWH_PER_GB = 0.81; // Consumo promedio red + servidor + dispositivo
    const CARBON_INTENSITY = 442; // Gramos de CO2 por kWh (Promedio global)

    // 3. Cálculos
    const energyKWh = transferGB * KWH_PER_GB;
    const co2Grams = energyKWh * CARBON_INTENSITY;

    return {
        dataTransferKB: (transferBytes / 1024).toFixed(2),
        energyUsedWh: (energyKWh * 1000).toFixed(4), // Convertido a Watt-hora
        co2Grams: co2Grams.toFixed(4)
    };
};