# Getting Started

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.

### Generating RSA Private and Public Keys

**Navigate to the `certs` directory**

```bash
cd src/main/resources/certs
```   

```bash
openssl genrsa -out keypar.pem 2048
```

```bash
openssl rsa -in keypar.pem -pubout -out public.pem
```

```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypar.pem -out private.pem 
```