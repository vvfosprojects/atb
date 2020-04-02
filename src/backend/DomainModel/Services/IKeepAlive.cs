using DomainModel.CQRS.Commands.KeepAlive;

namespace DomainModel.Services
{
    public interface IKeepAlive
    {
        void Insert(KeepAliveCommand command);
    }
}
