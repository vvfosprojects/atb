using DomainModel.CQRS.Commands.AddPatientCommand;

namespace DomainModel.Services
{
    public interface INewPositiveCase
    {
        void Add(NewPositiveCaseCommand command);
    }
}
