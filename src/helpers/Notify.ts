import { Emitter } from 'sbx-react-core';

type TNotify = {
    err?: {
        status: number;
        message: string;
    };
    message?: string;
}
const Notify = ({ err, message }: TNotify) => {
  if (err) {
    return Emitter.emit('notify:push', {
      status: err.status,
      message: err.message,
    });
  }

  return Emitter.emit('notify:push', {
    status: 200,
    message,
  });
};

export default Notify;
