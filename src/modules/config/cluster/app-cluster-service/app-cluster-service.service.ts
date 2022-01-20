import * as cluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppClusterServiceService {
    // eslint-disable-next-line @typescript-eslint/ban-types
    static register(workers: number, callback: Function): void {
        console.log(cluster.isMaster, 'asldçkaslçdkasçldkasçldkaspo809809890');
        if (cluster.isMaster) {
            console.log(`Master server started on ${process.pid}`);

            //ensure workers exit cleanly
            process.on('SIGINT', function () {
                console.log('Cluster shutting down...');
                for (let id in cluster.workers) {
                    // @ts-ignore
                    cluster.workers[id].kill();
                }
                // exit the master process
                process.exit(0);
            });

            const cpus = os.cpus().length;
            if (workers > cpus) workers = cpus;
            console.log(cpus, 'cpus length');
            for (let i = 0; i < workers; i++) {
                cluster.fork();
            }
            cluster.on('online', function (worker) {
                console.log('Worker %s is online', worker.process.pid);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            cluster.on('exit', (worker, code, signal) => {
                console.log(`Worker ${worker.process.pid} died. Restarting code:${code} signal:${signal}`);
                cluster.fork();
            });
        } else {
            console.log('process');
            callback();
        }
    }
}
