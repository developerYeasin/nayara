// With no number configured, wa.me lets the visitor pick a contact instead of failing.
export const whatsappUrl = (number, text) => {
  const digits = (number || '').replace(/\D/g, '');
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};
