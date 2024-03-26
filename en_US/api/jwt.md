# Custom JWT

To call APIs in NeuronEX, you need to first call the login interface to generate a JWT, and then call other interfaces to validate the JWT. The default JWT expires after one hour, and you can generate your own JWT to customize the expiration time.

When a user requests a RESTful API, please enter the **Token** in the http request header in the following format:

```go
Authorization: Bearer
							XXXXXXXXXXXXXXX
```

If the **Token** is correct, NeuronEX will return the result; otherwise, it will return the `401` code.

## What is JWT?

JWT is an open standard (RFC 7519) for securely transmitting information. The JWT structure consists of three parts: header (Header), payload (Payload), and signature (Signature).

NeuronEX first checks the subdirectories  **etc** of the NeuronEX installation directory to see if the **iss** field contains a corresponding .pem or .pub file. Then, it checks the fields inside the file for validation. The JWT structure required in NeuronEX is as follows:

```json
header
{
    "alg": "RS256",
    "typ": "JWT"
}

payload
{
    "iss": "username",
    "iat": "1679622798",
    "exp": "1679626398",
    "aud": "neuron",
    "bodyEncode": "0"
}
```

### Header

* Token type (typ): JWT
* Algorithm used (alg): RS256

### Payload

* Issuer (iss): Define it yourself according to your needs, but make sure it is consistent with the name of the public key file generated. For example, if iss is neuron, you need to generate the neuron.pem public key file.
* Issued at (iat): Issue time
* Expiration time (exp): Issue expiration time
* Audience (aud): NeuronEX, cannot be modified

## Generate public and private keys

Before signing the JWT, you need to generate a pair of public and private keys, and put the generated public key public.pem in the subdirectories of the NeuronEX installation directory **etc**. NeuronEX automatically loads files in **etc** and decodes them using the public key.

:::tip
The default installation path for Docker and deb/rpm packages is `/opt/neuronex`.

The public key file name must be consistent with the issuer in the JWT.
:::

Use the OpenSSL command-line tool to generate RSA keys:

```bash
# Generate private key
$ openssl genrsa -out private.key 2048
# Generate public key
$ openssl rsa -in private.key -out public.pem -pubout
```

## How to generate JWT?

Use the [JWT official website](https://jwt.io/) tool to generate. In Decoded, fill in:

* Algorithm: RS256
* Header: Header
* Payload: Payload
* Verify Signature: Fill in the public and private keys `-----BEGIN PUBLIC KEY-----` and `-----BEGIN RSA PRIVATE KEY-----`.