import { AxiosResponse } from 'axios';
import { createGunzip } from 'zlib';

export const parseJsonGZBufferToJson = <Object = any>(
  response: AxiosResponse,
  limit = 10,
): Promise<Object[]> => {
  const gunzip = createGunzip();

  response.data.pipe(gunzip);

  let concatString = '';
  let closingTagsCount = 0;

  return new Promise((resolve, reject) => {
    // Encapsulates submit
    const submit = () => {
      const parsed = concatString
        .split('}')
        .slice(0, limit)
        .map((part, index, array) => {
          const isLast = index === array.length - 1;
          if (isLast) {
            return `${part}}`;
          }

          return `${part}},`;
        })
        .join('');

      gunzip.close();

      resolve(JSON.parse(`[${parsed}]`));
    };

    gunzip.on('error', (error) => reject(error));

    gunzip.on('data', (chunk) => {
      const chunkString: string = chunk.toString();

      // Counts closing tags
      closingTagsCount += chunkString.replace(/[^}]/gi, '').length;

      // Just concats strings
      concatString = concatString.concat(chunkString);

      if (closingTagsCount >= limit) {
        submit();
      }
    });

    gunzip.on('finish', () => submit());
  });
};
