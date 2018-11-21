#!/bin/bash
cd "$(dirname "$0")"

PASS_PHRASE="imperdiblesoft"
SUBJECT="/C=ES/ST=Madrid/L=Madrid/O=ImperdibleSoft/CN=localhost"
DAYS="1825"

CA_PRIVATE_KEY="webapp-ca-private-key.key"
CA_ROOT_CERTIFICATE="webapp-ca-root-certificate.pem"

DEV_SERVER_PRIVATE_KEY="webapp-dev-server.key"
DEV_SERVER_CERTIFICATE_SIGNING_REQUEST="webapp-dev-server.csr"
DEV_SERVER_CERTIFICATE_CONFIG="webapp-dev-server.ext"
DEV_SERVER_CERTIFICATE="webapp-dev-server.crt"

# create Certificate Authority private key
if [  ! -f  "$CA_PRIVATE_KEY" ]; then
    openssl genrsa \
        -aes256 \
        -passout pass:$PASS_PHRASE \
        -out $CA_PRIVATE_KEY 2048
else
    echo "Skip CA Private Key generation (already exists)"
fi

# create root certificate
if [  ! -f  "$CA_ROOT_CERTIFICATE" ]; then
    openssl req \
        -x509 \
        -new \
        -passin pass:$PASS_PHRASE \
        -key $CA_PRIVATE_KEY \
        -sha256 \
        -days $DAYS \
        -subj $SUBJECT \
        -out $CA_ROOT_CERTIFICATE
else
    echo "Skip Root Certificate generation (already exists)"
fi

# create dev server private key
openssl genrsa -out $DEV_SERVER_PRIVATE_KEY 2048

# create certificate signing request
openssl req \
    -new \
    -key $DEV_SERVER_PRIVATE_KEY \
    -subj $SUBJECT \
    -out $DEV_SERVER_CERTIFICATE_SIGNING_REQUEST

# create config file
echo "authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = localhost
" > $DEV_SERVER_CERTIFICATE_CONFIG

# create dev server certificate
openssl x509 -req \
    -in $DEV_SERVER_CERTIFICATE_SIGNING_REQUEST \
    -CA $CA_ROOT_CERTIFICATE \
    -CAkey $CA_PRIVATE_KEY \
    -CAcreateserial \
    -out $DEV_SERVER_CERTIFICATE \
    -passin pass:$PASS_PHRASE \
    -days $DAYS \
    -sha256 \
    -extfile $DEV_SERVER_CERTIFICATE_CONFIG

# cleanup
rm $DEV_SERVER_CERTIFICATE_CONFIG
rm $DEV_SERVER_CERTIFICATE_SIGNING_REQUEST
rm *.srl # serial

echo "Done!"
echo "Add Root certificate to your Operative System"
echo "    - root certificate:" $CA_ROOT_CERTIFICATE
echo "Configure dev server with:"
echo "    - certificate:" $DEV_SERVER_CERTIFICATE
echo "    - private key:" $DEV_SERVER_PRIVATE_KEY
