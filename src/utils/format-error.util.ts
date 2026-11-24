import { Logger } from '@nestjs/common';
import type { GraphQLFormattedError } from 'graphql';
import { CLIENT_ERROR_CODES } from '../constants/client-errors.constants.js';

const logger = new Logger('GraphQL');

export const formatError = (
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError => {
  const code = formattedError.extensions?.['code'] as string | undefined;

  if (code && CLIENT_ERROR_CODES.has(code)) {
    const { stacktrace: _stacktrace, ...extensions } =
      formattedError.extensions ?? {};
    return { ...formattedError, extensions };
  }

  logger.error(
    formattedError.message,
    error instanceof Error ? error.stack : String(error),
  );

  return {
    message: 'Internal server error',
    extensions: { code: 'INTERNAL_SERVER_ERROR' },
  };
};
