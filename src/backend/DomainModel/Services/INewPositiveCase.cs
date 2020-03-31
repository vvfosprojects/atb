using DomainModel.CQRS.Commands.NewPositiveCase;

namespace DomainModel.Services
{
    public interface INewPositiveCase
    {
        void Add(NewPositiveCaseCommand command);
    }
}
