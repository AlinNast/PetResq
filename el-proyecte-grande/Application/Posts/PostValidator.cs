using Domain;
using FluentValidation;

namespace Application.Posts
{
    public class PostValidator : AbstractValidator<Post>
    {
        public PostValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.PetType).NotEmpty();
            RuleFor(x => x.StatusType).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
        }
    }
}