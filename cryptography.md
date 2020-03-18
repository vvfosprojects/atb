#Cryptography

## SHA-256 hasing

```c#
private static string ComputeSha256Hash(string rawData)
{
  // Create a SHA256
  using (SHA256 sha256Hash = SHA256.Create())
  {
    // ComputeHash - returns byte array
    byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

    // Convert byte array to a string
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < bytes.Length; i++)
    {
      builder.Append(bytes[i].ToString("x2"));
    }
    return builder.ToString();
  }
}
```

## 3DES encryption

```c#
public static string Encrypt(string toEncrypt, string key)
{
    byte[] keyArray = UTF8Encoding.UTF8.GetBytes(key);
    byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);

    TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
    //set the secret key for the tripleDES algorithm
    tdes.Key = keyArray;
    //mode of operation. there are other 4 modes.
    //We choose ECB(Electronic code Book)
    tdes.Mode = CipherMode.ECB;
    //padding mode(if any extra byte added)

    tdes.Padding = PaddingMode.PKCS7;

    ICryptoTransform cTransform = tdes.CreateEncryptor();
    //transform the specified region of bytes array to resultArray
    byte[] resultArray =
      cTransform.TransformFinalBlock(toEncryptArray, 0,
      toEncryptArray.Length);
    //Release resources held by TripleDes Encryptor
    tdes.Clear();
    //Return the encrypted data into unreadable string format
    return Convert.ToBase64String(resultArray, 0, resultArray.Length);
}
```

## 3DES decryption

```c#
public static string Decrypt(string cipherString, string key)
{
    byte[] keyArray = UTF8Encoding.UTF8.GetBytes(key);
    //get the byte code of the string

    byte[] toEncryptArray = Convert.FromBase64String(cipherString);

    TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
    //set the secret key for the tripleDES algorithm
    tdes.Key = keyArray;
    //mode of operation. there are other 4 modes.
    //We choose ECB(Electronic code Book)

    tdes.Mode = CipherMode.ECB;
    //padding mode(if any extra byte added)
    tdes.Padding = PaddingMode.PKCS7;

    ICryptoTransform cTransform = tdes.CreateDecryptor();
    byte[] resultArray = cTransform.TransformFinalBlock(
                         toEncryptArray, 0, toEncryptArray.Length);
    //Release resources held by TripleDes Encryptor
    tdes.Clear();
    //return the Clear decrypted TEXT
    return UTF8Encoding.UTF8.GetString(resultArray);
}
```