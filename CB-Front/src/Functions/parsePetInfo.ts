export function parsePetInfo(petInfo: string) {
  const [petName, ...healthParts] = petInfo.split(":");

  return {
    petName: petName?.trim() || "Не указан",
    healthProblems: healthParts.join(":").trim() || "Проблемы не указаны",
  };
}