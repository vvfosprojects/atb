using DomainModel.CQRS.Commands.UpdatePositive;

namespace DomainModel.Services
{
    public interface IUpdatePositive
    {
        void Update(UpdatePositiveCommand command, string group);
    }
}
