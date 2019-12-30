<script>  
  import { websiteAddress } from "../headers";
  import { config } from "../store";

  const potentialAction = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url: websiteAddress,
    potentialAction: {
      "@type": "SearchAction",
      target: `${websiteAddress}/search/{search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const contactPoint = {
    "@context": "http://schema.org",
    "@type": "Organization",
    url: websiteAddress,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `${$config.telNumberPrefix} ${$config.telNumber}`,
        contactType: "customer service",
        availableLanguage: "Slovak"
      }
    ]
  };
</script>

{@html '<script type="application/ld+json">'+ JSON.stringify(potentialAction) + '</script>'}
{@html '<script type="application/ld+json">'+ JSON.stringify(contactPoint) + '</script>'}
