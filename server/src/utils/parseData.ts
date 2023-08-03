export default function parseData(data: string) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}
