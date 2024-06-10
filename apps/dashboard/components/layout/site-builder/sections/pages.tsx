export default function SiteBuilderPagesSection(){
  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-heading-xl">
        Pages
      </div>
      <div className="flex flex-col gap-y-3 font-satoshi">
        <p>
          This is the pages section.
        </p>
        <p>
          It's main purpose will be to allow the user to add, remove, and edit pages
          from the site.
        </p>
        <p>
          You will also be able to set the home page and 404 page from here.
          As well as rename, duplicate, and delete pages.
        </p>
      </div>
    </div>
  )
}