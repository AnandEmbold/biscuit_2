import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.Cipher;
import java.security.NoSuchAlgorithmException;
import java.security.InvalidKeyException;
import java.security.InvalidAlgorithmParameterException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;

class CipherAlgorithmIssues {
	
	public void weakCipherAlgorithms()
	{
		try {
			// Or DESede, RC2, RC4 as these are known to be vulnerable*
			Cipher c = Cipher.getInstance("AES/GCM/NoPadding"); 
			Cipher des = Cipher.getInstance("DES"); 
			Cipher desCipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
			Cipher desede = Cipher.getInstance("DESede"); 
			Cipher rc2 = Cipher.getInstance("RC2"); 
			Cipher rc4 = Cipher.getInstance("RC4"); 
			Cipher rc5 = Cipher.getInstance("RC5"); 
			Cipher md5 = Cipher.getInstance("MD5"); 
			Cipher sha1 = Cipher.getInstance("SHA-1");
			Cipher dsa = Cipher.getInstance("DSA"); 
			Cipher sslv2 = Cipher.getInstance("SSLV2");
			Cipher sslv3 = Cipher.getInstance("SSLV3"); 
			Cipher pbes = Cipher.getInstance("PBEWithMD5AndDES");
			Cipher pbede = Cipher.getInstance("PBEWithHmacSHA1AndDESede");
			Cipher blowfs = Cipher.getInstance("Blowfish");
			Cipher trippledes1 = Cipher.getInstance("3DES");
			Cipher trippledes2 = Cipher.getInstance("EDE3-DES");
			Cipher idea = Cipher.getInstance("IDEA");
			Cipher pgp = Cipher.getInstance("PGP");
			Cipher openpgp = Cipher.getInstance("OpenPGP");
			Cipher gnupg = Cipher.getInstance("GnuPG");
			Cipher dh = Cipher.getInstance("DH");
			Cipher ecdhe = Cipher.getInstance("ECDHE");				
		} 
		catch (NoSuchAlgorithmException | NoSuchPaddingException e) {}
	}
	
	public void CompliantCipherAlgorithms()
	{
		try {
			// Compliant
			Cipher c = Cipher.getInstance("AES/GCM/NoPadding"); 
		} 
		catch (NoSuchAlgorithmException | NoSuchPaddingException e) {}
	}
}