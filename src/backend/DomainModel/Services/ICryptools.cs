namespace DomainModel.Services
{
    public interface ICryptools
    {
        string Encrypt(string s);

        string Decrypt(string s);
    }
}