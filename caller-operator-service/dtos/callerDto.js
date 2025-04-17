export const validateCaller = (data) => {
  if (!data.name || typeof data.name !== 'string') {
    return 'Le nom est requis et doit être une chaîne de caractères valides.';
  }

  const phone = data.phone.trim();
  const internationalPhoneRegex = /^\+?[1-9]\d{1,14}$/;
  const localPhoneRegex = /^\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,9}$/;

  if (
    !data.phone ||
    typeof data.phone !== 'string' ||
    (!internationalPhoneRegex.test(data.phone) && !localPhoneRegex.test(data.phone))
  ) {
    return 'Le téléphone est requis et doit posséder un format valide (ex: +33612345678, 06 12 34 56 78).';
  }

  return null;
};