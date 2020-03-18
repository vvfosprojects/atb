using DomainModel.CQRS.Commands.AddPatientCommand;

namespace DomainModel.Services
{
    public interface IAddPositive
    {
        void Add(NewPositiveCommand command);
    }
}
