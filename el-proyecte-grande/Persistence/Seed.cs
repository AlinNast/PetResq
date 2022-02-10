using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            
            // USER ENTRY CEVA
            // if (!userManager.Users.Any() && !context.Activities.Any())
            // {
            //     var users = new List<User>
            //     {
            //         new User
            //         {
            //             Name = "Bob",
            //             Password = "1234",
            //             Email = "bob@test.com",
            //             PhoneNumber = "0123456789"
            //         }
                    
            //     };

            //     foreach (var user in users)
            //     {
            //         await userManager.CreateAsync(user, "Pa$$w0rd");
            //     }


        if(!userManager.Users.Any()){
            var users = new List<AppUser>{
                new AppUser{
                    DisplayName = "Bob",
                    UserName = "bob",
                    Email = "bob@test.com"
                },
                new AppUser{
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@test.com"
                },
                new AppUser{
                    DisplayName = "Jane",
                    UserName = "Jane",
                    Email = "jane@test.com"
                }
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (context.Posts.Any()) return;

        var posts = new List<Post>
            {
                new Post
                {
                    Location = "Piata Romana",
                    UserID = Guid.NewGuid(),
                    Title = "Lost Dog",
                    Description = "Lost around Piata Romana last night, its a black and white dalmatian",
                    PetType = PetType.DOG.ToString(),
                    StatusType = StatusType.LOST.ToString(),
                    Date = DateTime.Now
                
                },
                new Post
                {
                    Location = "Parcul Tineretului",
                    UserID = Guid.NewGuid(),
                    Title = "Found Dog",
                    Description = "Found a dirty Dalmatian, under the mud he was black and white, and his name tag says: Cruella",
                    PetType = PetType.DOG.ToString(),
                    StatusType = StatusType.FOUND.ToString(),
                    Date = DateTime.Now
                }
                
            };

            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}
