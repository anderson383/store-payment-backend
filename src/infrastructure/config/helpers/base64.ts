export const encodeBase64 = (payload:string) => {
  const buffer = Buffer.from(payload);

  return buffer.toString('base64');
};
